<template>
	<div class="seller" v-if="shopinfo">
		<div class="comment">
			<!-- 商家评分 -->
			<section class="rating-warp">
				<div class="rating-info">
					<h4>{{shopinfo.rating.shop_score.toFixed(1)}}</h4>
					<div class="shop-score">
						<span>商家评分</span>
						<rating :rating="shopinfo.rating.shop_score"></rating>
					</div>
				</div>
				<div class="other-score">
					<div class="tp-score">
						<div>
							<span>味道</span>
							<p>{{shopinfo.rating.taste_score.toFixed(1)}}</p>
						</div>
						<div class="packing">
							<span>包装</span>
							<p>{{shopinfo.rating.package_score.toFixed(1)}}</p>
						</div>
					</div>
					<div class="rider-score">
						<span>配送</span>
						<p>{{shopinfo.rating.rider_score.toFixed(1)}}</p>
					</div>
				</div>
			</section>
			<!-- 评论区 -->
			<div class="shop-info">
				<!-- 标签 -->
				<ul class="tags">
					<li v-for="(item,index) in shopinfo.tags" :key="index" :class="{user:item.unsatisfied}">
						{{item.name}}<span v-if="item.count>0">{{item.count}}</span>
					</li>
				</ul>
				<!-- 内容 -->
				<ul class="comments-warp">
					<li v-for="(item,index) in shopinfo.comments" :key="index">
						<div class="comment-user">
							<img :src="item.avatar || 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png' " />
						</div>
						<div class="comment-info">
							<div class="comment-name">
								<h4>{{item.username}}</h4>
								<small>{{item.rated_at}}</small>
							</div>
							<div class="comment-rating">
								<rating :rating="item.rating"></rating>
								<span :style="{color:ratingcoment(item.rating).color}">{{ratingcoment(item.rating).text}}</span>
							</div>
							<div class="comment-text">{{item.comment_text}}</div>
							<div class="comment-reply">{{item.reply.content}}</div>
							<ul class="comment-imgs">
								<li v-for="(img,i) in item.order_images" :key="i">
									<img :src="img.image_hash" />
								</li>
							</ul>
						</div>

					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Rating from '../../components/Rating.vue'
	export default {
		name: 'Seller',
		data() {
			return {
				shopinfo: null
			}
		},
		created() {
			this.getData()
		},
		components: {
			Rating
		},
		methods: {
			getData() {
				this.$axios('api/profile/comments').then(res => {
					this.shopinfo = res.data
					console.log(this.shopinfo)
				})
			},
			ratingcoment(rating)
			{
				const content=[
					{text:'吐槽' , color:'rgba(137,159,188)'},
					{text:'较差' , color:'rgba(137,159,188)'},
					{text:'一般' , color:'rgba(251，154，11)'},
					{text:'满意' , color:'rgba(251，154，11)'},
					{text:'超赞' , color:'rgba(255,96,0)'}		
				]
				return content
			}
		}
	}
</script>

<style scoped="scoped">
	.seller {
		background-color: #FFFFFF;
	}

	.rating-info {
		display: flex;
	}

	.rating-info h4 {
		font-size: 26px;
		color: red;
	}

	.shop-score {
		margin-left: 20px;
	}

	.rating-warp {
		display: flex;
		padding: 20px 20px;
		border-bottom: 8px #EEEEEE solid;
	}

	.other-score {
		display: flex;
		margin-left: 25px;
		font-size: 10px;
		flex: 1;
	}

	.tp-score {
		display: flex;
	}

	.tp-score div p {
		margin-top: 3px;
	}

	.packing {
		margin-left: 40px;
	}

	.rider-score {
		margin-left: 40px;
		flex: 1;
		text-align: center;
		border-left: 2px #EEEEEE solid;
		font-size: 10px;
	}

	.rider-score p {
		margin-top: 3px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 30px 10px 10px;
	}

	.tags li {
		padding: 5px 10px;
		background-color: powderblue;
		margin-left: 5px;
		opacity: 0.6;
		margin-top: 10px;
	}

	.user {
		color: #AAAAAA !important;
		background-color: #f5f5f5 !important;
	}

	.comment-user img {
		width: 35px;
		height: 35px;
		border-radius: 50%;
	}

	.comments-warp {
		padding-left: 10px;
		padding-right: 10px;
	}

	.comments-warp>li {
		display: flex;
		padding-top: 15px;
		padding-bottom: 30px;
		border-bottom: 2px #EEEEEE solid;
	}

	.comment-info {
		margin-left: 12px;
	}
	.comment-name small {
		float: right;
		position: relative;
		top: -12px;
	}
	.comment-reply {
		position: relative;
		margin-top: 10px;
		background-color: #EEEEEE;
		padding: 10px 5px;
		border-radius: 5px;
		color: black;
	}

	.comment-reply::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		top: -12px;
		left: 10px;
		border: 5px solid transparent;
		border-bottom: 10px solid #EEEEEE;

	}

	.comment-imgs img {
		width: 150px;
		height: 150px;
	}

	.comment-rating {
		margin-top: 5px;
	}

	.comment-imgs {
		margin-top: 10px;
	}
</style>
