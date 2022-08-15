/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// console.log('Happy hacking :) -----')

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');


const formatPrice = (price) => {
    // aqui utilizamos la API de internacionalizacion del formato inmerso en el navegador para decir el tipo de style que es moneda y que la moneda fuese Dollar, al final se asigna el format a la variable que es el parametro
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price)

    return newPrice;
}
// intl 
// 1 format fechas
// 2 format monedas

// web api
//contectarnos al server 
window
.fetch(`${baseUrl}/api/avo`)
//procesar la respuesta y convertirla en JSON
.then(res => res.json())
// JSON -> data -> renderizar info browser
.then(resJson =>{
    const todosLosItems = [];
    resJson.data.forEach(item => {
        
        // crear imagen 
        const image = document.createElement('img');
        image.src = `${baseUrl}${item.image}`
        image.className = 'row-span-2';
        // crear el titulo
        const title = document.createElement('h2');
        title.textContent = item.name;
        // ejemplos de agregar el style
        // title.style = 'font-size: 2rem;' // se puede agregar como texto
        // title.style.fontSize = '3rem'; //este estilo es el de objecto que compone al atributo style
        
        // ejemplo de agregar clases
        title.className = 'col-span-1 text-2xl text-black-600'; //agregando clases al elemento 


        // crear el precio
        const price = document.createElement('div');
        price.textContent = formatPrice(item.price);
        price.className = " col-span-1 "
        const container = document.createElement('div');
        container.append(image,title, price)
        container.className = 'grid grid-rows-2 grid-flow-col gap-2 bg-white border-4 border-green-600  rounded  p-2';

        todosLosItems.push(container)
        // console.log(todosLosItems)
        // console.log(item.name)
    });
    //el array se va pasando nodo por nodo recordando el spread operator de clases pasadas los 3 puntos ...
    appNode.append(...todosLosItems)
    // console.log(data)
})