export function Header() {
  return (
    <header className="topbar">
      <div className="container nav">
        <a className="brand" href="#home">
          <strong>Pawlish</strong>
          <span>宠爱有光，从一次安心洗护开始</span>
        </a>
        <nav className="nav-links">
          <a href="#home">首页</a>
          <a href="#services">服务项目</a>
          <a href="#member">会员中心</a>
          <a href="#reviews">宠主评价</a>
          <a href="#space">门店环境</a>
          <a href="#contact">联系我们</a>
        </nav>
        <a className="btn btn-primary" href="#contact">
          立即预约
        </a>
      </div>
    </header>
  );
}
