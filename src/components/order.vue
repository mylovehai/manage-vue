<template>
  <div>
    <el-table
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 60%;margin-left: 10%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="收货人">
              <span>{{ props.row.foodsList[0].user_username }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.foodsList[0].user_address }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.foodsList[0].user_mobile }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="order_id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_money">
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="order_status_text">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button
            type="primary"
            size="mini"
            v-if="scope.row.handleOption.check"
            @click="handleCheck(scope.$index, scope.row)">查看
          </el-button>

          <el-button
            type="warning"
            size="mini"
            v-if="scope.row.handleOption.cancel"
            @click="handleCancel(scope.$index, scope.row)">取消
          </el-button>

          <el-button
            type="success"
            size="mini"
            v-if="scope.row.handleOption.receive"
            @click="handleReceive(scope.$index, scope.row)">接单
          </el-button>

          <el-button
            type="success"
            size="mini"
            v-if="scope.row.handleOption.delivery"
            @click="handleDeliver(scope.$index, scope.row)">派送
          </el-button>

          <el-button
            type="success"
            size="mini"
            v-if="scope.row.handleOption.confirm"
            @click="handleConfirm(scope.$index, scope.row)">送达
          </el-button>

        </template>

      </el-table-column>

    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.list.length">
    </el-pagination>


    <el-dialog title="订单报表" :visible.sync="orderDialog" center>

      <div>

        <span style="font-family: 微软雅黑; font-size: 26px">回味餐厅</span>

        <br/>
        <br/>

        <span>下单时间：{{orderDetail.add_time}}</span>
        <br/>
        <span style="display:block; float:left; width:240px;">********************************************</span>
        <br/>
        <span style="display:block; float:left; width:240px;">-------------------食物列表--------------------</span>
        <div style="width: 250px;height: 30px;line-height: 10px" v-for="item of orderDetail.foodsList">
          <br/>
          <span style="display:block; float:left; width:150px;">{{item.title}}</span>
          <span style="display:block; float:left; width:50px;">*{{item.number}}</span>
          <span style="display:block; float:left; width:50px;">{{item.sell_price}}</span>
        </div>

        <br/>
        <span style="display:block; float:left; width:240px;">-----------------------其它----------------------</span>

        <br/>
        <br/>
        <span style="display:block; float:left; width:200px;height: 30px">餐盒费</span>
        <span>{{orderDetail.box_cost}}</span>

        <br/>
        <br/>
        <span style="display:block; float:left; width:200px;height: 30px">配送费</span>
        <span>{{orderDetail.send_cost}}</span>

        <br/>
        <br/>
        <span style="display:block; float:left; width:240px;">********************************************</span>
        <br/>
        <span style="width:200px;height: 30px">总价:{{orderDetail.total_money}}</span>

        <br/>
        <span style="display:block; float:left; width:240px;">---------------------------------------------------</span>
        <br/>
        <span>配送地址</span>
        <br/>
        <span>15607834180</span>
        <br/>
        <span>liaohai</span>


      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="orderDialog = false">取 消</el-button>
        <el-button type="primary" @click="orderDialog = false">打印报表</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {OrderList,HandleReceive,HandleDeliver,HandleConfirm} from "../api/api";

  export default {
    name: "order",
    data() {
      return {
        list: [],
        orderDetail:{},
        orderDialog:false,
        formLabelWidth: '120px',

        currentPage: 1,
        pagesize: 10

      }
    },
    methods: {
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      getOrderList() {
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(OrderList,{},config).then(res => {
          this.list = res.data.data;
          // console.log(this.list)
        })
      },

      handleCheck(index,row) {
        this.orderDialog = true;
        this.orderDetail = row;
        //console.log(this.orderDetail);
      },
      handleCancel() {
        //取消订单操作
      },
      handleReceive(index,row) {
        //接单操作
        console.log(row.order_id)
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(HandleReceive,
          {orderId:row.order_id},config).then(res=>{
          if (res.data.errno == 0){
            this.$message({
              type:'success',
              message: '接单成功'
            })
            this.getOrderList();
          }
        })
      },
      handleDeliver(index,row) {
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(HandleDeliver,
          {orderId:row.order_id},config).then(res=>{
          if (res.data.errno == 0){
            this.$message({
              type:'success',
              message: '操作成功'
            })
            this.getOrderList();
          }
        })
      },
      handleConfirm(index,row) {
        let config ={
          headers: {
            'X-Order-Token': localStorage.getItem('token')
          },
        }
        this.$axios.post(HandleConfirm,
          {orderId:row.order_id},config).then(res=>{
          if (res.data.errno == 0){
            this.$message({
              type:'success',
              message: '操作成功'
            })
            this.getOrderList();
          }
        })
      }


    },
    mounted() {
      this.getOrderList();
    }
  }
</script>

<style>

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
