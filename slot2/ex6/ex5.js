function getDataFromServer() {
    return new Promise((resolve, reject) => {
        console.log("Fetching data...");

        setTimeout(() => {
            const success = Math.random() > 0.5; //set random success voi ti le 50 50
            if (success) {
                resolve({ message: "Thanh cong!", data: ["I love Fpt"] });
            } else {
              reject(new Error("That bai! Thu lai sau!"));
            }
        }, 2000);
    });
}

getDataFromServer()
    .then(result => {
        console.log("✅ Success:", result);
    })
    .catch(error => {
        console.error("❌ Error:", error.message);
    });
