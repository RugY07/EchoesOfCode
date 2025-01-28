#include<stdio.h>
#include<stdlib.h>
#include<time.h>
#include<unistd.h>

void GenerateRandomArray(char array[], int size, int lower, int upper){
    for(int i=0; i<size; i++){
        array[i] = (rand() % (upper - lower + 1)) + lower;
    }
}
int main()
{
    int size = 10, lower = 1, upper = 256;
    char array[size];
    char answer[size];
    int timer = 30;
    int flag;
    char play;

    srand(time(NULL));

    do {
        GenerateRandomArray(array, size, lower, upper);

        printf("----------------MEMORY GAME----------------\n");
        int level = 1;
        printf("%d\n", &level);
        printf("\nMemorize this string: %s\n", array);

        sleep(timer);

        system("cls");
        printf("----------------MEMORY GAME----------------\nDid you memorize the string??\n");
        printf("Write your answer: \n");
        scanf("%s", answer);

        if(answer == array){
            printf("CONGRATULATIONS! You win.\n");
            flag = 1;
        }
        else if(answer != array){
            printf("You lost :(\n");
            flag = 0;
        }
        
        if(flag == 1){
            size += 3;
            level++;
        }
        printf("Do you want to play again? (y/n)");
        
        while(play != 'y' | play != 'n'){
            scanf("%c\n", &play);
            if(play != 'y' | play != 'n'){
                printf("Please enter y/n for yes or no respectively\n");
            }
        }

        printf("------------------THE END------------------\n");
    }
    while(play == 'y');
    
    return 0;
}