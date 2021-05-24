<template>
  <main class="d-flex flex-column justify-content-end flex-grow-1 ">
    <section class="p-3   flex-grow-1 d-flex flex-column overflow-auto ">
      <div
        v-for="(item, idx) in messages"
        :key="idx"
        :class="
          `align-self-${
            item.id == myid ? 'end' : 'start'
          } my-2 d-flex flex-column align-items-${
            item.id == myid ? 'end' : 'start'
          } `
        "
      >
        <p class="text-secondary m-0" style="font-size:12px">
          {{ item.id == myid ? "you" : item.name ? item.name : item.id }}
        </p>
        <p
          :class="
            `bg-${
              item.id == myid ? 'success' : 'secondary'
            } text-white rounded-3 m-0 p-0 py-1 px-2  `
          "
        >
          {{ item.message }}
        </p>
      </div>
    </section>
    <section class="bg-warning d-flex mt-3" style="min-height:3rem">
      <input class="m-0 flex-grow-1 rounded-0" type="text" />
      <button class="btn btn-primary m-0">send</button>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      myid: "5",
      messages: [
        { id: "5", message: "its from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" ,name:"Adam"},
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" ,name:"Jhon"},
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
        { id: "dc7469bd-336c-4652-b84b-1", message: "its not from me" },
      ],
    };
  },
};
</script>

