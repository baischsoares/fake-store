const app = new Vue({
    el: '#app',
    data: {
        produtos: {},
        categorias:{},
        categoria: 'All Products'
    },
    filters:{
     formatarNumero(valor){
        return valor.toLocaleString('en-IN', {style: 'currency', currency: 'USD'});
     },
    },
    methods:{
        fetchProdutos(){
            fetch('https://fakestoreapi.com/products/?limit=5')
            .then(r=>r.json())
            .then(r=>{
                this.produtos = r;
            })
        },
        fetchCategorias(){
            fetch('https://fakestoreapi.com/products/categories')
            .then(r=>r.json())
            .then(r=>{
                this.categorias = r;
            })
        },
        fetchProdutosCategorias(categoria){
            this.categoria = categoria
            fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(r=>r.json())
            .then(r=>{
                this.produtos = r;
            })
        },
    },
    created(){
        this.fetchCategorias();
        this.fetchProdutos();
    }
})