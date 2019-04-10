<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData" border >
              <el-table-column prop="goodsName" label="商品名称" >
                
              </el-table-column>
              <el-table-column prop="count" label="数量" width="80">
                
              </el-table-column>
              <el-table-column prop="price" label="金额" width="80">
                
              </el-table-column>
              <el-table-column  label="操作" width="100" fixed="right">
                <template scope="scope">
                  <el-button type="text" size="small" @click="delSingGoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="divTotal">
              <small>数量：</small>{{totalCount}} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<small>金额：</small>{{totalMoney}}元
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger" @click="delAllGoods()">删除</el-button>
              <el-button type="success">结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>
          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>       
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="span-price">￥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for=" goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
             <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for=" goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
             <el-tab-pane label="饮料">
              <div>
                <ul class="cookList" > 
                  <li v-for=" goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
             <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for=" goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Pos',
  data () {
    return {
      tableData:[
        ],
      oftenGoods:[
         
      ],
      type0Goods:[
          
      ],
      type1Goods:[
          
      ],
      type2Goods:[
          
      ],
      type3Goods:[
          
      ],
      totalCount:0,
      totalMoney:0
    }
  },
  created:function(){
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
    .then(reponse=>{
      // console.log(reponse);
      this.oftenGoods=reponse.data
    })
    .catch(error=>{
      // console.log(error);
      alert('400,不能访问')
    })
    axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
    .then(reponse=>{
      console.log(reponse);
      this.type0Goods=reponse.data[0];
      this.type1Goods=reponse.data[1];
      this.type2Goods=reponse.data[2];
      this.type3Goods=reponse.data[3];
    })
    .catch(error=>{
      // console.log(error);
      alert('400,不能访问')
    })
  },
  mounted:function(){
    var orderHeihgt=document.body.clientHeight;
    document.getElementById('order-list').style.height=orderHeihgt+'px';
  },
  methods:{
    addOrderList(goods){
      this.totalCount=0;
      this.totalMoney=0;
      let isHave=false;
      for(let i = 0;i<this.tableData.length;i++){
        if(this.tableData[i].goodsId==goods.goodsId){
          isHave=true;
        }
      }

      if (isHave) {
        let arr = this.tableData.filter(o=>o.goodsId==goods.goodsId);
        arr[0].count++;
      }
      else{
        let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
        this.tableData.push(newGoods);
      };
      this.getAllMoney();
      
    }, 
      // 删除单个商品功能
      delSingGoods(goods){
        this.tableData=this.tableData.filter(o=>o.goodsId !=goods.goodsId);
        this.getAllMoney();
      },
      // 汇总数量和金额
      getAllMoney(){
        this.totalCount=0;
        this.totalMoney=0;
        if(this.tableData){
          this.tableData.forEach((element)=>{
            this.totalCount+=element.count;
            this.totalMoney=this.totalMoney+(element.price*element.count);
          })
        }
      },
      // 删除全部商品
      delAllGoods(){
        this.totalCount=0;
        this.totalMoney=0;
        this.tableData=[];
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pos-order{
  background: #F9FAFC;
  border-right:1px solid #C0CCDA;
}
.div-btn{
  margin-top: 10px;
}
.title{
  height: 20px;
  border-bottom:1px solid #D3dce6;
  background: #F9FAFC;
  padding: 10px;
  text-align: left;
}
.often-goods-list ul li{
  list-style: none;
  float:left;
  border:1px solid #E5E9F2;
  padding: 10px;
  margin: 10px;
  background-color: #fff;
  cursor: pointer;
}
.span-price{
  color: #58B7FF
}
.goods-type{
  clear: both;
}
.cookList li{
   list-style: none;
   width:23%;
   border:1px solid #E5E9F2;
   height: auot;
   overflow: hidden;
   background-color:#fff;
   padding: 2px;
   float:left;
   margin: 2px;
   cursor: pointer;
}
.cookList li span{
    display: block;
    float:left;
}
.foodImg{
   width: 40%;
}
.foodName{
   font-size: 18px;
   padding-left: 10px;
   color:brown;
}
.foodPrice{
   font-size: 16px;
   padding-left: 10px;
   padding-top:10px;
}
.divTotal{
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #E5E9F2;
}
</style>
