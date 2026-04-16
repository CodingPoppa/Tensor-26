#include <iostream>
#include <string>
using namespace std;
void myfunc(); {
     static count = 0;
    count++;
    cout << "Function called" << count << "times" << endl;
}
int main(){
myfunc();
myfunc();
myfunc();
return 0;
}