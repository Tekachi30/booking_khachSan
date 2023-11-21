<template>
  <!--
   Demo các tip nhỏ nhỏ để xử lý các input nhập vào cơ bản nhất có thể ?
   Tại sao ko có nâng cao
   => nâng cao ra sao là do mọi người code - tôi không đủ skill để có nó :))
-->

  <!-- 
  Đầu tiên hãy làm cái easy nhất input text 
  + Thường là sẽ sử dụng @change tại input
  + Tạo 1 biến boolean focus -> trả thông báo
  + Button thật ra là cái nút hay dùng để kết thúc thao tác
    + Vd như hàm thêm thì buttom sẽ chứa @click="add()"

  + e tại check_input(e) là 1 cái biến event bắt sự kiện thay đổi - đại loại vậy  
  + Thực chất v-model của vuejs nó bao gồm rất nhiều method trong đó rồi nền khá tiện
  + Ở html css bình thường mọi người hay dùng :input  
-->

<!-- cách này sẽ liên tục xử lý cái input luôn khá là hay
     Về một số thứ thì thư viên hay package của thư viện có SP 
     Mà dùng thì hơi quằn nếu ko quen

     Như trong cái code cũ là tôi chỉ cho nó hiện khi click vào 1 cái button 
      Ok nói sương sương v thui :) mọi người cần gì alo tui
-->
  <div class="p-4">
    <h5 class="mb-4  font-extrabold leading-none tracking-tight text-gray-900  ">Input type="text"</h5>
    <input type="text" id="default-search" v-model="text"
      class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
      placeholder="Nhập cái gì đó đi" required>
      <p v-if="!text && text_focus">Không thấy gì cả</p>
      <p v-if="text.length >= 10 && text_focus"> Qua nhieu</p>
      <p v-if="!validText(text) && text_focus">co chu cai viet Hoa</p>

    <button type="button" @click="checkText()"
      class="mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Kiểm
      tra text</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text:'',
      text_focus:false // đầu tiên tắt nó đi
    };
  },
  mounted() {

  },
  components: {},
  methods: {
    // Hàm thì viết ở đây
    checkText()
    {
      // Đơn giản là khi click là sẽ gọi được các này ra 
      // Lợi ích của cách này là gì , check là chúng ta kiếm soát được khi nào bao lôi
      // Nhược điểm chi khi click lần 1 nó mới la làng :))) 
      this.text_focus = true
    },
    
    validText(text)
    {
      // nghịch thử
      // https://topdev.vn/blog/regex-la-gi/
      const re = /[a-z]/
      re.test(text)
    }
  },
};
</script>