// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用来保存获取到的用户信息
    nowQs: 0, //当前要显示题目的索引
    answers: {}, //用来保存每一道题的答案
    question: [{
        "id": 1,
        "type": "radio",
        "title": "你现在交女朋友了吗？",
        "options": [{
            "value": 0,
            "lable": "单身狗一只"
          },
          {
            "value": 1,
            "lable": "有女朋友"
          },
          {
            "value": 2,
            "lable": "拒绝回答"
          },
          {
            "value": 3,
            "lable": "享受孤单"
          },
        ]
      }, {
        "id": 2,
        "type": "radio",
        "title": "今年多大了",
        "options": [{
            "value": 0,
            "lable": "17~20"
          },
          {
            "value": 1,
            "lable": "21~25"
          },
          {
            "value": 2,
            "lable": "25~30"
          },
          {
            "value": 3,
            "lable": "30~35"
          },
        ]
      },
      {
        "id": 3,
        "type": "checkbox",
        "title": "除了写代码还有什么兴趣爱好",
        "options": [{
            "value": 0,
            "lable": "听歌"
          },
          {
            "value": 1,
            "lable": "睡觉"
          },
          {
            "value": 2,
            "lable": "旅行"
          },
          {
            "value": 3,
            "lable": "吃饭"
          },
        ]
      }
    ]
  },
  onLoad() {
    //加载数据 更新数据 更新页面
    // wx.request({
    //   url: '', //填写数据的API加载数据
    //   method:'GET',
    //   success:res=>{
    //     console.log(res)
    //     //更新数据更新页面 
    //     this.setData({question:res.data}) //把res.data更新到question中
    //   }
    // })
    wx.getUserInfo({
      withCredentials:true,
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },
  formChange(event) {
    // //自定义方法，表单的change事件
    console.log(event.detail.value)
    this.data.answers[this.data.question[this.data.nowQs].id] = event.detail.value
  },
  nextQuestion() {
    if (!this.hasSelected()) {
      console.log("请选择答案")
      wx.showToast({
        title: '请选择答案',
        icon: 'none'
      })
      return
    }
    this.setData({
      nowQs: this.data.nowQs + 1
    })
  },
  //验证是否答题
  hasSelected() {
    const {
      answers,
      nowQs,
      question
    } = this.data
    const reuslt = answers[question[nowQs].id]
    if (reuslt === undefined) {
      return false
    }
    return true
    // return !! reuslt
  },
  //提交按钮事件
  subAnswers() {
    if (this.hasSelected()) {
      wx.showToast({
        title: '请选择答案',
        icon: 'none'
      })
      return
    }
    // //发送数据给服务器
    // wx.request({
    //   url: '', //服务器地址
    //   data:{
    //     nickName:this.data.userInfo.nickName,
    //     reuslt:this.data.answers
    //   },
    //   method:'POST', //给服务器添加数据请求类型必须为POST
    //   success:res=>{
    //     console.log(res)
    //   }
    // })
  }
})