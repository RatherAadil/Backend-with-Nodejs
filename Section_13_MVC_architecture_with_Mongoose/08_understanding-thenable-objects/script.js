const myObj = {
  then(resolve) {
    setTimeout(() => {
      resolve('Resolve function called ');
    }, 2000);
  },
};
const data = await myObj;
console.log(data);
// myObj.hello((data) => {
//   console.log(data);
// });
