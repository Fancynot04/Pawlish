# 个人助理记忆系统

一个面向个人助理的 Python 方案，融合 **结构化记忆**、**滚动摘要** 与 **RAG（检索增强生成）**，解决上下文长度限制，同时保持可控、可解释与可用性。

## 目标

- 记住稳定偏好与长期项目，减少重复沟通。
- 保持跨对话、跨任务的连续性。
- 需要细节时可精准回忆，不依赖超长上下文。
- 支持多场景：费用记录、日程提醒、论文笔记等。

## 核心概念

- **三段记忆**：短期 / 中期 / 长期分层管理，兼顾即时上下文与长期一致性。
- **结构化记忆**：稳定事实与偏好（Profile/Projects/Events）。
- **滚动摘要**：对超长对话进行压缩保存。
- **RAG**：需要具体细节时，从历史内容检索并回填上下文。
- **自动深化**：重复出现且稳定的信息会逐步变强，成为默认偏好。

## 三段记忆设计

**短期记忆（Short-term）**  
- 当前会话内的上下文与最近若干轮消息  
- 只保留在模型上下文，不写入长期存储  

**中期记忆（Mid-term）**  
- 滚动摘要 + 近期关键事件  
- 存储于 `convo_summaries` 和 `events`  

**长期记忆（Long-term）**  
- 稳定偏好、长期项目、持续性事实  
- 存储于 `profile_memory` 与 `projects`  

## 关键场景（来自需求）

### 1) 食材费用记录
- 记录每日食材价格、单位与数量。
- 支持查询单一食材的价格变化趋势。

### 2) 日程与提醒
- 添加日程与提醒时间。
- 到点触发通知（App/邮件/IM）。

### 3) AI 论文记录
- 支持记录论文（标题/链接/PDF）。
- 自动生成摘要并写入记忆。
- 原文片段进入 RAG 方便后续检索。

## 不同问题类型的系统行为

| 问题类型 | 例子 | 动作 | 写入记忆 | 使用 RAG |
|---|---|---|---|---|
| 一般知识 | “牛杂怎么做？” | 直接回答 | 否 | 否 |
| 偏好相关 | “我喜欢清淡口味…” | 回答 + 保存偏好 | 是 | 否 |
| 细节回忆 | “上次的牛杂汤步骤？” | 检索 + 回答 | 否 | 是 |
| 长期项目 | “我在准备考研…” | 更新项目 | 是 | 可能 |
| 风格要求 | “以后三段式回复” | 保存风格 | 是 | 否 |

## 架构（Python 技术栈）

- **API**：FastAPI
- **数据库**：PostgreSQL
- **向量检索**：pgvector
- **缓存**：Redis
- **任务队列**：Celery 或 RQ
- **部署**：Docker + Docker Compose

## 数据模型（初版）

**users**
- id, timezone, language, created_at

**profile_memory**
- id, user_id, key, value, confidence, strength, updated_at

**projects**
- id, user_id, name, goal, status, next_step, updated_at

**events**
- id, user_id, title, details, event_time, created_at

**convo_summaries**
- id, user_id, session_id, summary, created_at

**rag_chunks**
- id, user_id, source, content, embedding, created_at

**ingredient_costs**
- id, user_id, item_name, price, unit, quantity, total, purchased_at, source

**calendar_events**
- id, user_id, title, start_time, timezone, remind_before_minutes, status

**papers**
- id, user_id, title, authors, year, venue, tags, summary, source_url, created_at

## 结构化表的扩展方式

**结论：结构化表不会自动新增，需通过迁移来扩展。**  
为了降低维护成本，推荐以下两种策略之一：

1. **固定表 + 类型字段（推荐）**  
   - 在 `events` 或 `profile_memory` 中加入 `type` 字段  
   - 新需求通过新增 `type` 枚举，不必新建表  

2. **固定表 + JSONB 扩展**  
   - 对不稳定字段使用 `payload` JSONB  
   - 需求变化只改写入逻辑，不改表结构  

如果你坚持“每类需求一个新表”，就需要配套 **迁移系统**（如 Alembic）来自动创建/变更表结构。

## 记忆写入规则

1. **显式指令优先**
   - “记住这个/别记这个”覆盖所有规则。
2. **自动写入仅限稳定高价值信息**
   - 偏好、长期项目、稳定身份信息。
3. **不确定信息需确认**
   - 短期状态或模糊表述先询问。

## 自动深化逻辑

每条记忆有 `strength` 与 `confidence`（0~1）。

**强化（重复出现）**

```
strength = min(1, strength + alpha * (1 - strength))
confidence = min(1, confidence + beta)
```

**衰减（定期）**

```
strength = strength * (1 - decay)
```

**默认参数**
- alpha = 0.2
- beta = 0.1
- decay = 0.1 / 周

**升级规则**
- strength >= 0.7 或同一偏好出现 >= 3 次 → 默认生效

**冲突处理**
- 优先高置信度或明显更强的记忆，否则询问用户

## RAG 使用说明

RAG 只在“需要精确细节”的场景使用。

**流程**
1. 问题向量化
2. 在 `rag_chunks` 中检索
3. 拼接结果到上下文
4. 生成回答

## 日程提醒

- 使用调度器（Celery Beat / APScheduler / cron）
- 统一以 UTC 存储，展示时转换用户时区
- 提醒时间 = `start_time - remind_before_minutes`

## API（草案）

**读取**
- GET /memory/profile
- GET /memory/projects
- POST /memory/search

**写入**
- POST /memory/profile
- POST /memory/projects
- POST /memory/events
- POST /memory/ingredient
- POST /memory/paper
- POST /memory/calendar

**管理**
- DELETE /memory/{id}
- POST /memory/forget

## MVP 计划

1. 数据模型 + 基础 CRUD
2. 滚动摘要任务
3. RAG 检索管线
4. 日程提醒
5. 论文写入与摘要

## 成功指标

- 记忆命中率
- 用户纠错率（越低越好）
- 任务完成时间下降
- 复用率与留存

---

如果你愿意，下一步可以补充：
- SQL 表结构与迁移
- API 请求/响应示例
- 路由规则伪代码
- FastAPI 最小原型
