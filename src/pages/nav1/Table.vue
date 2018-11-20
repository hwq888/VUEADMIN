<template>
<div class="content-box">
  <!--<el-card class="box-card">-->
    <div class="table-list-search-box">
      <el-form :inline="true" :model="filters" ref="filters" size="mini">
        <el-form-item label="关键字"> <el-input v-model="filters.keyword" style="width: 150px" placeholder="借款人/手机号"></el-input></el-form-item>
        <el-form-item label="划扣渠道">
          <el-select v-model="filters.deductChannel" style="width: 150px">
            <el-option v-for="item in options.deductChannel" :key="item.val" :label="item.name" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button type="primary">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-list-box">
      <el-table ref="multipleTable" border stripe size="mini" v-loading="table.loading" :data="table.date" tooltip-effect="dark">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="订单号">
          <template slot-scope="scope">
            <span class="table-list-link" @click="toDetail(scope.row)">{{scope.row.no}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="客户名称"></el-table-column>
        <el-table-column prop="mobile" label="客户手机"></el-table-column>
        <el-table-column prop="nameCard" label="客户身份证"></el-table-column>
        <el-table-column prop="borrowMoney" label="借款金额"></el-table-column>
        <el-table-column prop="periods" label="借款期数"></el-table-column>
        <el-table-column prop="date" label="借款日期"></el-table-column>
        <el-table-column prop="repayDate" label="还款日期"></el-table-column>
        <el-table-column prop="operator" label="跟进人"></el-table-column>
      </el-table>
      <div class="table-list-page-box">
        <el-pagination
          background
          layout="prev, pager, next, jumper, sizes, total"
          :page-size="table.pageSize"
          :current-page="table.curPage"
          :total="table.totalpage"
          :page-sizes="[10,50,100,300,500,1000]"
          @current-change="changePage"
          @size-change="changePageSize">
        </el-pagination>
      </div>
    </div>
  <!--</el-card>-->
</div>
</template>
<script>
import api from '@/api/api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      table: {
        loading: false, // 过渡
        date: [
          {
            'id': 1,
            'no': 'O242135',
            'status': 3,
            'todayStatus': true,
            'name': '彭刚',
            'operator': '常强',
            'mobile': '15852735435',
            'nameCard': '767977653108318917',
            'borrowMoney': 55734.74,
            'periods': '2/3',
            'date': '2000-10-26',
            'borrowPeriods': 67,
            'repayDate': '2000-10-26',
            'day': 37,
            'money': 8877.67,
            'type': 3,
            'updata': '1992-12-26 17:10:01'
          },
          {
            'id': 2,
            'no': 'E379816',
            'status': 5,
            'todayStatus': true,
            'name': '杨秀兰',
            'operator': '汤秀英',
            'mobile': '13288652251',
            'nameCard': '250813492210315224',
            'borrowMoney': 25215.34,
            'periods': '1/3',
            'date': '1970-12-30',
            'borrowPeriods': 42,
            'repayDate': '1970-12-30',
            'day': 87,
            'money': 7600.54,
            'type': 1,
            'updata': '2014-08-15 01:00:33'
          }], // 数据源
        curPage: 1, // 当前页
        pageSize: 10, // 每页条数
        totalpage: 0 // 总页数
      },
      options: {
        // 划扣渠道
        deductChannel: [
          {val: '', name: '全部'},
          {val: '1', name: '渠道1'},
          {val: '2', name: '渠道2'},
          {val: '3', name: '渠道3'},
          {val: '4', name: '渠道4'}
        ]
      },
      filters: {
        keyword: '', // 关键字
        deductChannel: '' // 划扣渠道
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created: function () {},
  mounted () {
    this.init()
  },
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    init () {
      console.log(api)
      this.getTable()
    },
    // 获取案件列表
    getTable (page) {
      this.table.loading = true
      let params = {}
      api.getTable(params).then(res => {
        let data = res.data
        this.table.loading = false
        if (data.code === 0) {
          this.table.curPage = Number(data.curPage)
          this.table.totalpage = data.page
          this.table.date = data.list
        } else {
          this.$message({message: data.msg, type: 'error'})
        }
      })
    },
    // 分页
    changePage (curPage) {
      this.getTable(curPage)
    },
    // 分页
    changePageSize (pageSize) {
      this.table.pageSize = pageSize
      this.getTable(1)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toDetail (row) {
      const route = {
        name: 'TableDetails',
        query: {
          no: row.no
        },
        meta: {
          title: row.name
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
      // const route = {
      //   name: 'TableDetails',
      //   params: {
      //     no: row.no
      //   },
      //   meta: {
      //     title: row.name
      //   }
      // }
      // this.addTag({
      //   route: route,
      //   type: 'push'
      // })
      // this.$router.push(route)
    }
  }
}
</script>
