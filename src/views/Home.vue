<template>
  <div class="home">
    <Header />
    <ContentContainer>
      <EditableTable />
      <CurrencyConverter />
    </ContentContainer>
    <Footer />
  </div>
</template>

<script>
import ContentContainer from "../components/ContentContainer.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import EditableTable from "../components/EditableTable/Table.vue";
import CurrencyConverter from "../components/CurrencyConverter.vue";

export default {
  name: "Home",
  components: {
    CurrencyConverter,
    ContentContainer,
    EditableTable,
    Header,
    Footer
  }
};
</script>

<style lang="scss">
.home {
  min-height: 564px;
}
</style>
