<template name="protocol-popup">
	<view @touchmove.stop.prevent="clear" v-show="showPopup">
		<view class="popup_mask" @touchmove.stop.prevent="clear"></view>
		<view class="popup_content">
			<view class="title">{{title}}</view>
			<view class="explain_text">
				我们非常重视您的隐私安全。
				<view class="line">
					我们制定了
					<navigator :url="protocolPath" @click="opweb('用户协议',protocolPath)" class="path" hover-class="navigator-hover">《用户协议》</navigator>
					和
					<navigator :url="policyPath" @click="opweb('隐私政策',policyPath)" class="path" hover-class="navigator-hover">《隐私政策》</navigator>
					，在此特向您说明如下：
				</view>
				<view class="line">
					1、为向您提供软件基本功能，我们会收集、使用必要的信息；
				</view>
				<view class="line">
					2、基于您的明示授权，我们可能会获取您的通知、相册、读写/存储、设备信息、网络等信息或授权，您有权拒绝或取消授权；
				</view>
				<view class="line">
					3、我们会采取业界先进的安全措施，尽全力保护您的信息安全；
				</view>
				<view class="line">
					4、未经您的同意，我们不会从第三方处获取、共享或向其提供您的信息;
				</view>
			</view>

			<view class="button">
				<view @tap="back">暂不使用</view>
				<view @tap="confirm">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "lyg-popup",
		props: {
			title: {
				type: String,
				default: "服务协议和隐私政策"
			},
			// 协议路径
			protocolPath: {
				type: String
			},
			// 政策路径
			policyPath: {
				type: String
			},
			policyStorageKey: {
				type: String,
				default: "has_read_privacy"
			}
		},
		data() {
			return {
				showPopup: false
			};

		},
		created: function() {
			var that = this;
			console.log("lyg-popup created");
			uni.getStorage({
				key: this.policyStorageKey,
				success: (res) => {
					if (res.data) {
						that.showPopup = false;
						uni.showTabBar({});
					}
				},
				fail: function(e) {
					that.showPopup = true;
					uni.hideTabBar({});
					console.log(e)
				}
			});
		},
		methods: {
			// 禁止滚动
			clear() {
				return;
			},
			opweb(title,url) {
				this.$emit('openViewWeb', title,url)
			},
			back() {
				this.$emit('popupState', false)
				// #ifdef APP-PLUS  
				plus.runtime.quit();
				// #endif
			},
			// 关闭弹框
			confirm() {
				this.showPopup = false;
				this.$emit('popupState', true);

				uni.setStorage({
					key: this.policyStorageKey,
					data: true
				});
				uni.showTabBar({});
			}
		}
	};
</script>

<style lang="scss">
	.popup_mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		z-index: 9899999;

	}

	.popup_mask {
		opacity: 1;
	}

	.popup_content {
		overflow: hidden;
		box-sizing: border-box;
		padding: 40upx 20upx 0 20upx;
		position: fixed;
		bottom: 30%;
		border-radius: 8px;
		left: 50%;
		margin-left: -40%;
		right: 0;
		min-height: 400upx;
		background: #ffffff;
		width: 80%;
		z-index: 9999999;

		.title {
			text-align: center;
			font-size: 34upx;
			padding: 10upx 0 0 0;
		}

		.explain_text {
			font-size: 30upx;
			padding: 30upx 30upx 40upx 30upx;
			line-height: 38upx;

			.line {
				display: block;

				.path {
					color: #007aff;
					display: inline-block;
					text-align: center;
				}
			}
		}

		.button {
			display: flex;
			padding: 20upx;
			align-items: center;
			font-size: 34upx;
			justify-content: space-around;
			border-top: 1upx solid #f2f2f2;

			view {
				text-align: center;
			}
		}
	}
</style>
