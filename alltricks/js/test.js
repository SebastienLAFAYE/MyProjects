function addFunction() {
    
    var arr = ["S", "M", "L", "XL"];
    var com = ["en stock", "vite plus que 4 en stock !", "C'est le dernier, dépêchez vous !", "C'est le dernier, dépêchez vous !"];
    var price = ["29,99€", "29,99€", "29,99€", "29,99€"];


    var z = document.getElementById("product-size");
    var add = document.createElement('option');
    add.innerHTML = "Taille:";
    z.appendChild(add);



    for (var i = 0; i < arr.length; i++) {
        var x = document.getElementById("product-size");
        var opt = document.createElement('option');
        opt.innerHTML = arr[i] + " " + com[i] + " " + price[i];
        x.appendChild(opt);
    }
}