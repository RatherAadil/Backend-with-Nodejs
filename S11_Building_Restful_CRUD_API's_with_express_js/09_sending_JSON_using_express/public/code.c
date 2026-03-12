#include <stdio.h>
#include <malloc.h>
struct node
{
    int data;
    struct node *next;
};
struct node *create(struct node *, int);
void display(struct node *);
void main()
{
    struct node *p;
    int n, i;
    p = NULL;
    printf("\nEnter how many nodes to create:->");
    scanf("%d", &n);
    p = create(p, n);
    printf("\nNodes in Linked List are\n");
    display(p);
}

struct node *create(struct node *p, int n)
{
    int i, val;
    struct node *r, *t;
    for (i = 0; i < n; i++)
    {
        if (p == NULL)
        {
            p = (struct node *)malloc(sizeof(struct node));
            printf("\nEnter Value:->");
            scanf("%d", &val);
            p->data = val;
            p->next = NULL;
            r = p;
        }
        else
        {
            t = (struct node *)malloc(sizeof(struct node));
            printf("\nEnter Value:->");
            scanf("%d", &val);
            t->data = val;
            t->next = NULL;
            r->next = t;
            r = t;
        }
    }
    return p;
}
void display(struct node *p)
{
    while (p != NULL)
    {
        printf("%d-->", p->data);
        p = p->next;
    }
    printf("NULL");
}