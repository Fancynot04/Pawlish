#include<stdio.h>

typedef struct stu{
    char id[100],name[100];
    int chinese,math,english;
} Stu;

int main() {
    
    int n;
    printf("输入学生数量:");
    scanf("%d",&n);
    if (n>100){
        printf("人数不能超过100");
        return 0;
    }
    FILE *f = fopen("out.dat","w");
    for (int i=0;i<n;i++){
        Stu student;     
        scanf("%s %s %d %d %d", student.id,student.name,&student.chinese,&student.math,&student.english);
        if (student.chinese<60 || student.math<60 || student.english<60) {    
            fprintf(f,"%s %s %d %d %d\n", student.id,student.name,student.chinese,student.math,student.english); 
        }
    }
    fclose(f);
    return 0;
}

