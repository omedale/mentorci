<template>
  <div class="container" v-if="student">
    <h3>
      {{ student.name }}
      <a href="#" @click="showEditStudentForm">
        <i class="fas fa-pencil-alt"></i>
      </a>
    </h3>
    <div v-show="!editStudentDetail">
      <p>Email: {{ student.email }}</p>
      <p>Stage: {{ student.stage }}</p>
      <p>
        Github:
        <a :href="student.github | validLink">{{ student.github }}</a>
      </p>
    </div>
    <div v-show="editStudentDetail" class="row">
      <form class="col s12" @submit.prevent="updateStudent">
        <div class="row">
          <div class="input-field col m6 s12">
            <input
              v-model="student.name"
              placeholder="Name"
              id="name"
              type="text"
              class="validate"
            />
            <label class="active" for="name">Name</label>
          </div>
          <div class="input-field col m6 s12">
            <input
              v-model="student.email"
              id="email"
              type="email"
              class="validate"
              placeholder="email"
            />
            <label class="active" for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col m6 s12">
            <select v-model="student.stage">
              <option
                v-for="stage in $store.state.stages.stages"
                v-bind:key="stage"
                :value="stage"
                >{{ stage }}</option
              >
            </select>
            <label>Stage</label>
          </div>
          <div class="input-field col m6 s12">
            <input
              v-model="student.github"
              id="github"
              type="text"
              class="validate"
              placeholder="github"
            />
            <label class="active" for="github">github</label>
          </div>
        </div>
        <button class="btn">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import { validLink } from "../_helpers";

export default {
  name: "student-detail",
  data() {
    return {
      editStudentDetail: false
    };
  },
  mounted() {
    $("select").formSelect();
  },
  computed: {
    student() {
      let filtered = this.$store.state.students.students.filter(
        st => st.id == this.$route.params.id
      );
      if (filtered.length > 0) return filtered[0];
      return undefined;
    }
  },
  methods: {
    async updateStudent() {
      const student = await this.$store.dispatch(
        "students/updateStudent",
        this.student
      );
      this.editStudentDetail = false;
    },
    showEditStudentForm() {
      this.editStudentDetail = !this.editStudentDetail;
    }
  },
  filters: {
    validLink
  }
};
</script>

<style>
i.fa-pencil-alt {
  font-size: 25px;
}
</style>