<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { axiosInstance } from "./plugins/axios.ts";
import formatDate from "./helpers/dateFormatter.ts";

const pages = ref();
const page = ref(1);

const companiesIsLoading = ref(false);
const companies = ref([]);
const allCompanies = ref([]);
const getCompanies = async function () {
  companiesIsLoading.value = true;

  try {
    const { data } = await axiosInstance.get("company");
    console.log(data);

    allCompanies.value = [...data.items];
    companies.value = allCompanies.value.slice(0, 5);
    pages.value = data.pages;
  } catch (error) {
    console.log(error);
  } finally {
    companiesIsLoading.value = false;
  }
};

watch(page, () => {
  if (page.value === 1) companies.value = allCompanies.value.slice(0, 5);
  else companies.value = allCompanies.value.slice(5);
});

onMounted(() => {
  getCompanies();
});
</script>

<template>
  <div class="container mx-auto pt-16">
    <table
      class="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <thead>
        <tr
          class="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal"
        >
          <th class="py-3 px-6">Name</th>
          <th class="py-3 px-6">Created Date</th>
          <th class="py-3 px-6">Updated Date</th>
        </tr>
      </thead>
      <tbody class="text-gray-700 text-sm divide-y divide-gray-200">
        <tr v-if="companiesIsLoading">
          <td colspan="3">
            <v-infinite-scroll></v-infinite-scroll>
          </td>
        </tr>
        <tr
          v-else
          v-for="company in companies"
          :key="company._id"
          class="hover:bg-gray-50"
        >
          <td class="py-3 px-6">{{ company.name.ru }}</td>
          <td class="py-3 px-6">{{ formatDate(company.created_at) }}</td>
          <td class="py-3 px-6">{{ formatDate(company.updated_at) }}</td>
        </tr>
      </tbody>
    </table>

    <v-pagination
      v-model="page"
      class="my-6 mx-auto flex justify-center"
      :length="2"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<style lang="scss" scoped></style>
