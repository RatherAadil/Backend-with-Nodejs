console.log('A file started...');
for (let i = 0; i < 1000000000; i++) {
  if (i % 500000000 == 0) {
    console.log(i);
  }
}
