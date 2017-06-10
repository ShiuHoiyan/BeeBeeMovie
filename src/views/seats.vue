<template>
	<div>
		<h1>请选择座位</h1>
		<div class="seat-container">
			<div class="left-part">
				<div id="screen">大屏幕</div>
				<p v-for="row in this.seats">
					<span v-for="seat in row" :class="seat.style" @click="selectseat(seat)"></span>
				</p>
			</div>
			<div class="center-part">
				<div><span class="available"></span>可选</div>
				<div><span class="sold"></span>已售</div>
				<div><span class="seleceted"></span>已选</div>
			</div>
			<div class="right-part">
				<p><label>电影：</label>{{this.filmname}}</p>
				<p><label>影院：</label>{{this.cinema}} {{this.room}}号厅</p>
				<p><label>时间：</label>{{this.time}}</p>
				<div v-if="this.orderSeats.length" class="warning">
					<label>座位：</label>
					<div>
						<div v-for="item in showSeats">{{item}} </div>
					</div>
				</div>
				<div v-else class="warning">
					<label>座位：</label><div>尚未选择座位</div>
				</div>
				<p><label>共计</label>{{this.price * this.orderSeats.length}}元</p>
				<button class="btn" @click="submitOrder">提交订单</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'seats',
	created: function() {
		this.getSeats();
	},
	data() {
		return {
			seats: [[],[],[],[],[],[],[],[],[],[]],
			orderSeats: [],
			showSeats: [],
			filmname: this.$route.params.title,
			cinema: this.$route.params.cinema,
			price: this.$route.params.price,
			time: this.$route.params.time,
			room: this.$route.params.room,
		}
	},
	methods: {
		getSeats: function() {
			const playid = this.$route.params.playid;
			this.$http.get(`/movie/seat/${playid}`)
				.then((res) => {
					this.seats = res.data;
					this.seats.forEach((item) => {
						if (item.available) {
							item.style = 'available';
						} else {
							item.style = 'sold';
						}
						const flag = item.available ? true : false;
						this.seats[item.row-1][item.col-1] = {
							selected: false,
							row: item.row,
							col: item.col,
							style: item.style,
							available: flag,
							seatid: item.seatid,
						}
					})
					console.log(this.seats);
				})
				.catch((e) => {
					console.log(e);
				})
		},
		selectseat: function(seat) {
			console.log(seat);
			const seatsArr = this.seats.slice();
			if (seat.available && !seat.selected) {
				const newSeat = seat;
				newSeat.selected = true;
				newSeat.style = 'seleceted';
				let str = '第'+seat.row+'排'+seat.col+'座';
				seatsArr[seat.row-1][seat.col-1] = newSeat;
				this.orderSeats.push(seat.id);
				this.showSeats.push(str);
				this.seats = seatsArr;
			} else if (seat.available && seat.selected) {
				const newSeat = seat;
				newSeat.selected = false;
				newSeat.style = 'available';
				seatsArr[seat.row-1][seat.col-1] = newSeat;
				const index = this.orderSeats.findIndex((item) => item === seat.id);
				this.orderSeats.splice(index, 1);
				this.showSeats.splice(index, 1);
				this.seats = seatsArr;
			}
		},
		submitOrder: function() {
			if (this.orderSeats.length === 0) {
				alert('请选择座位');
			} else {
				const playid = this.$route.params.playid;
				const data = {
					playlistid: playid,
					seats: this.orderSeats,
				}
				this.$http.post('/user/addorderform', data)
					.then((res) => {
						alert('成功提交订单');
						this.$router.push('/index');
					})
					.catch((e) => {
						console.log("提交订单失败");
					});
			}
		}
	}
}
</script>

<style scoped>
	.seat-container {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: flex-start;
		align-item: center;
	}
	p {
		margin: 0;
	}
	span {
		width: 25px;
		height: 20px;
	}
	.left-part {
		width: 350px;
		text-align: center;
	}
	.right-part label {
		margin-left: 200px;
		color: #ff8585;
	}
	.center-part {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content:center;
	}
	#screen {
	  width: 250px;
	  margin: 5px auto;
	  background: #ffff8c;
	  color: #ff8585;
	  text-align: center;
	   -moz-border-radius: 100px / 50px;
	   -webkit-border-radius: 100px / 50px;
	   border-radius: 100px / 50px;
	}
	.available {
		display: inline-block;
		border: 1px #dadada solid;
		background-color: white;
	}
	.available:hover {
		background-color: lightgreen;
		cursor: pointer;
	}
	.seleceted {
		display: inline-block;
		border: 1px #dadada solid;
		background-color: lightgreen;
	}
	.sold {
		display: inline-block;
		border: 1px #dadada solid;
		background-color: #cf4437;
	}

	.warning {
		height: 250px;
		margin-top: 20px;
		display: flex;
	}
	button {
		position: relative;
		left: 300px;
	}
</style>