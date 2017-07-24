<template>
	<div class="uiContextualLayer uiContextualLayerAboveRight" role="dialog" aria-label="Nội dung hội thoại" style="bottom: 0px; right: 0px;">
		<div class="_5v-0 _53ik">
			<div class="_53ij">
				<div>
					<div class="_2znk">
						<div height="280px" width="350" class="uiScrollableArea fade contentAfter" style="height: 280px;">
							<div class="uiScrollableAreaWrap scrollable" id="js_2k6">
								<div class="uiScrollableAreaBody" style="margin-right: -17px; width: 350px;">
									<div class="uiScrollableAreaContent">
										<div class="uiContextualLayerParent _2znm">
											<div class="">
												<div>
													<div class="_3vgh">Mặt cười &amp; Mọi người</div>
													<div class="_3vgi" style="min-height: 2000px;">
														<div class="clearfix">
															<span v-for="icon in icons" class="" @click="getIcon(icon)">
															<div class="_5zfs" role="button">
																<img :alt="icon.alt" class="_5zft img" draggable="false" height="28" :src="icon.src" width="28">
															</div>
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="uiScrollableAreaTrack hidden_elem" style="opacity: 0;">
								<div class="uiScrollableAreaGripper" style="height: 12px; top: 0px;"></div>
							</div>
				</div>
			</div>
	</div>


	</div>
</div>
</div>
</template>
<script>
 import axios from 'axios'
 export default{
	 props:{
		callbackicon:Function
	 },
	 data(){
		 return{
			icons:null
		 }
	 },
	 mounted:function(){
		axios.get('http://beta.json-generator.com/api/json/get/VySah5aSm').then((res)=>{
			this.icons = res.data
		})
	 },
	 methods:{
		 getIcon:function(icon){
			this.callbackicon(icon)
		 }
	 }
 }
</script>
<style>
	._4h3f {
		margin: 4px
	}

	._5zfs {
		border-radius: 4px;
		cursor: pointer;
		display: inline-block;
		height: 36px;
		line-height: 0;
		margin: 2px;
		text-align: center;
		-webkit-user-select: none;
		vertical-align: middle;
		width: 36px
	}

	._5zfs:not(._4f4o):hover {
		background: rgba(29, 33, 41, .04)
	}

	._4f4o {
		cursor: default
	}

	._5zft,
	._4f4q {
		/* height:28px; */
		/* margin:4px; */
		/* position:relative; */
		/* width:28px; */
	}

	._4f4q {
		background: #e9ebee;
		border-radius: 14px;
		position: absolute
	}

	._4f4o .img {
		margin: 6px
	}

	._2znk {
		background: #fff;
		border-radius: 2px;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .3);
		display: flex;
		flex-direction: column;
		height: 280px;
		justify-content: center;
		position: relative;
		text-align: center;
		width: 350px;
	}

	._2znm {
		text-align: left;
	}

	._3vgh {
		color: #90949c;
		cursor: default;
		margin: 8px 8px 4px;
		-webkit-user-select: none
	}

	._2znl {
		margin: 0 auto
	}

	._5zgc {
		background: #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .3);
		height: 40px;
		position: absolute;
		width: 240px;
		z-index: 1
	}

	._emz {
		background: rgba(0, 0, 0, .5);
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0
	}

	._3m-j ._5zfs:hover {
		background: none
	}

	._1pd4 {
		bottom: -2px;
		left: -2px;
		position: absolute
	}

	._1og- {
		background-color: #f6f7f9;
		border-radius: 0 0 2px 2px;
		border-top: 1px #dddfe2 solid;
		display: flex;
		height: 32px;
		justify-content: center;
		opacity: 1;
		transition: opacity .2s
	}

	._1og_ {
		opacity: 0
	}

	._1ogy {
		cursor: pointer;
		line-height: 0;
		padding: 8px
	}

	._1ogz {
		border-top: 2px #4080ff solid;
		margin-top: -1px;
		padding-top: 7px
	}

	.uiScrollableArea {
		direction: ltr;
		height: 100%;
		overflow: hidden;
		position: relative
	}

	.uiScrollableAreaWrap {
		height: 100%;
		outline: none;
		overflow-x: hidden;
		overflow-y: scroll;
		position: relative
	}

	.uiScrollableAreaWrapHorizontal {
		overflow-x: auto
	}

	.uiScrollableArea .uiScrollableAreaWrap {
		overflow-y: scroll
	}

	.uiScrollableArea.nofade .uiScrollableAreaWrap,
	.uiScrollableArea.fade .uiScrollableAreaWrap {
		/* margin-right: -30px;
		padding-right: 30px */
	}

	.uiScrollableArea.nofade .uiScrollableAreaBody {
		padding-right: 10px
	}

	.native .uiScrollableAreaBody,
	.no_js .uiScrollableAreaBody {
		width: auto !important
	}

	.uiScrollableAreaBottomAligned .uiScrollableAreaShadow {
		display: block
	}

	.uiScrollableAreaBottomAligned .uiScrollableAreaBody {
		height: 100%
	}

	.uiScrollableAreaBottomAligned .uiScrollableAreaContent {
		bottom: 0;
		position: absolute;
		width: 100%
	}

	.uiScrollableAreaBody {
		direction: ltr;
		position: relative
	}

	.uiScrollableAreaTrack {
		bottom: 2px;
		display: block;
		pointer-events: none;
		position: absolute;
		right: 2px;
		top: 2px;
		-webkit-user-select: none;
		width: 7px;
		z-index: 5
	}

	.contentAfter .uiScrollableAreaTrack:hover,
	.contentBefore .uiScrollableAreaTrack:hover,
	.contentAfter.uiScrollableAreaTrackOver .uiScrollableAreaTrack,
	.contentBefore.uiScrollableAreaTrackOver .uiScrollableAreaTrack,
	.uiScrollableAreaDragging .uiScrollableAreaTrack {
		background-color: rgba(0, 0, 0, .15);
		border-radius: 10px;
		width: 10px
	}

	.contentBefore.uiScrollableAreaTrackOver,
	.contentAfter.uiScrollableAreaTrackOver,
	.uiScrollableAreaDragging {
		cursor: default
	}

	.uiScrollableArea .uiContextualLayerPositioner {
		z-index: 4
	}

	.uiScrollableAreaShadow,
	.native .uiScrollableAreaTrack,
	.no_js .uiScrollableAreaTrack {
		display: none
	}

	.uiScrollableAreaGripper {
		background-clip: content-box;
		background-color: rgba(0, 0, 0, .4);
		border: 1px solid rgba(85, 85, 85, .6);
		border-radius: 7px;
		position: absolute;
		right: 0;
		transition: width 250ms;
		width: 5px
	}

	.uiScrollableAreaDragging .uiScrollableAreaGripper,
	.uiScrollableAreaTrackOver .uiScrollableAreaGripper,
	.uiScrollableAreaTrack:hover .uiScrollableAreaGripper {
		width: 8px
	}

	.uiScrollableArea.contentBefore:before,
	.uiScrollableArea.contentAfter:after {
		content: '';
		display: block;
		height: 2px;
		position: absolute;
		width: 100%;
		z-index: 99
	}

	.uiScrollableArea.contentBefore:before {
		top: 0
	}

	.uiScrollableArea.contentAfter:after {
		bottom: 0
	}

	.uiScrollableAreaWithTopShadow.contentBefore:before,
	.uiScrollableAreaWithShadow.contentAfter:after {
		background-color: rgba(0, 0, 0, .07)
	}

</style>
