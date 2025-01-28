#include<stdio.h>
#include<stdlib.h>
#include<time.h>

void GenerateRandomArray(char array[], int size, int lower, int upper){
    for(int i=0; i<size; i++){
        array[i] = (rand() % (upper - lower + 1)) + lower;
    }
}
int main(){
    int size = 10, lower = 1, upper = 256;
    char array[size];

    srand(time(NULL));

    GenerateRandomArray(array, size, lower, upper);

    printf("----------------MEMORY GAME----------------\n");
    printf("\nMemorize this string: %s\n", array);

    
}