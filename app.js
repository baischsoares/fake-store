const app = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: [],
    produtoEscolhido: false,
    categorias: [],
    categoria: 'All Products',
    carrinho: [],
    carrinhoAtivo: false,
  },
  filters: {
    formatarNumero(valor) {
      return valor.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'USD',
      });
    },
  },
  methods: {
    fetchProdutos() {
      fetch('https://fakestoreapi.com/products/?limit=5')
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },
    fetchCategorias() {
      fetch('https://fakestoreapi.com/products/categories')
        .then((r) => r.json())
        .then((r) => {
          this.categorias = r;
        });
    },
    fetchProdutosCategorias(categoria) {
      this.categoria = categoria;
      fetch(`https://fakestoreapi.com/products/category/${categoria}`)
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },
    fetchProduto(id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((r) => r.json())
        .then((r) => {
          this.produto = r;
        });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      this.produtoEscolhido = true;
    },
    fecharModal() {
      this.produtoEscolhido = false;
      this.produto = [];
    },
    fecharModalCliqueFora() {
      if (event.target == event.currentTarget) {
        this.carrinhoAtivo = false;
        this.fecharModal();
      }
    },
    adicionarCarrinho() {
      this.carrinho.push(this.produto);
    },
    removerItemdoCarrinho(id) {
      const indexPrimeiroItem = this.carrinho.findIndex((item) => {
        return item.id === id;
      });
      this.carrinho.splice(indexPrimeiroItem, 1);
    },
  },
  computed: {
    totalCarrinho() {
      let total = 0;
      this.carrinho.map((element) => {
        total += element.price;
      });
      return total;
    },
  },
  created() {
    this.fetchCategorias();
    this.fetchProdutos();
  },
});
