<template>
  <div>
    <header>Push Notification</header>
    <div class="app">
      <div class="categories">
        <category-item
          :category="category"
          v-for="category in categoryList"
          :key="category.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/CategoryItem";
import axios from "axios";

export default {
  components: {
    CategoryItem,
  },
  data() {
    return {
      categoryList: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/").then((categoryList_response) => {
      console.log("categoryList :>> ", categoryList_response);
      this.categoryList = categoryList_response.data.categoryList;
    });
  },
};
</script>
