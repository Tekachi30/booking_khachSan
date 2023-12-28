<template>
  <div>
    <ul v-for="room in rooms" :key="room.id">
      <li>
        {{ room.name }}
        <input type="number" min="1" v-model="roomQuantity[room.id]" >
        <button @click="increaseQuantity(room)">Tăng</button>
        <button @click="decreaseQuantity(room)">Giảm</button>
        <span>{{ roomQuantity[room.id] }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          quantity: 1,
          name: "Phòng đơn",
        },
        {
          id: 2,
          quantity: 2,
          name: "Phòng đôi",
        },
      ],
      roomQuantity: {},
    };
  },
  mounted() {
    this.init()
  },
  methods: { 
    increaseQuantity(room) {
      if (this.roomQuantity[room.id] >= room.quantity) {
        alert('Số lượng đặt phòng không được phép lớn hơn số lượng phòng thực tế.');
        this.roomQuantity[room.id] = room.quantity;
      }
      else {
        this.roomQuantity[room.id]++
      }

    },
    decreaseQuantity(room){
      if(this.roomQuantity[room.id]<= 0)
      {
        this.roomQuantity[room.id] = 0
      }
      else
      {
        this.roomQuantity[room.id]--
      }
    },
    init() {
      for (let i = 0; i < this.rooms.length; i++) {
        this.roomQuantity[this.rooms[i].id] = 0;
      }
    },
  },
};
</script>