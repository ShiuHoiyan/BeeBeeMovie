<template>
	<div id="orders">
		<h1>我的订单</h1>
		<ul class="order-list">
            <li v-for="order in orders" class="order-item">
            	<div class="order-header">
            		订单号:{{order.oid}}
            		时间:{{order.date}}
            	</div>
            	<div class="order-content">
            		<p>
            		<span class="title">{{order.moviename}}</span>
            		{{order.cinema}} {{order.screeningroom}}号厅  {{order.movietime}}
            		</p>
            		<p>{{order.ticketamount}}张票 共{{order.price}}元</p>
            	</div>
            	<button @click="deleteorder(order.oid)" class="btn">删除订单</button>
            </li>
          </ul>
	</div>
</template>

<script>
export default {
	name: 'orders',
	created: function() {
		this.getOrders();
	},
	data() {
		return {
			orders:[{
				oid: '',
				date: '',
				moviename: '',
				movietime: '',
				cinema: '',
				ticketamount: 0,
				price: 0.0,
				screeningroom: '',
			}],
		}
	},
	methods: {
		getOrders: function() {
			this.$http.get('/user/getorderforms')
				.then(res => {
					this.orders = res.data;
				})
				.catch(e => {
					console.log(e);
				});
		},
		deleteorder: function(oid) {
			this.$http.post('/user/deleteorder', {oid,})
				.then(res => {
					this.getOrders();
				});
		}
	}
}
</script>

<style scoped>
	h1 {
		margin-left: 100px;
	}
	.order-item {
		border-bottom: 1px solid #ffff8c;
		padding: 10px;
		list-style-type: none;
		position: relative;
	}
	label {
		color: #fd9385;
	}
	.title {
		font-size: 20pt;
		color: #fd9385;
	}
	.order-header {
		position: absolute;
		right: 20px;
	}
	.btn {
		position: absolute;
		right: 20px;
		bottom: 20px;
	}
</style>