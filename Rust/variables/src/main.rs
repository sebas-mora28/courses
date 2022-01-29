fn main() {
    println!("Hello, world!");

    const PORT: i32 = 4000;



    // tuplas 
    let tup : (u32, u32, char);

    tup = (3, 4, 'a');

    let (x, _y, _z) = tup;

    // arrays 

    let a = [1, 3 ,4 , 5];

    let numbers : [i32; 5] = [1, 2,  3 ,4 ,5];

    println!("a: {}", a[0]);
    println!("numbers: {}", numbers[0]);


    

    println!("Tupla: {}", tup.0);
    println!("x: {}", x);
    
    println!("PORT: {}", PORT);
}
