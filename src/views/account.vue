<template>
	<div id="account">
		<div class="left-bar">
			<router-link to="/account/profile">基本信息</router-link>
			<router-link to="/account/orders">我的订单</router-link>
		</div>
			
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'account',
	data() {
		return {

		}
	}
}
</script>

<style scoped>
	#account {
		margin: 10px;
		padding-left: 200px;
		box-sizing: border-box;
		height: 80%;
	}
	.left-bar {
		margin-left: -200px;
		width: 200px;
		float: left;
		border-right: 2px #ffff8c solid;
		text-align: center;
	}
	a {
		font-size: 16px;
		color: #ffff8c;
		display: block;
		width: 100%;
		padding-top: 30px;
		padding-bottom: 30px;
		text-decoration:none;
	}
	a:hover {
		color: #fd9385;
		border-right: 5px #fd9385 solid;
	}
</style>