<template>
  <Example>
    <ExampleInputs>
      <FormNumber label="Length" v-model="length" :min="1" />
      <FormSelect label="Type" v-model="type">
        <option value="words">Words</option>
        <option value="sentences">Sentences</option>
        <option value="paragraphs">Paragraphs</option>
      </FormSelect>
    </ExampleInputs>
    <ExampleCode :code="`generateLoremIpsum(${length}, '${type}')`" />
    <ExampleResult>
      {{ generateLoremIpsum(length, type) }}
    </ExampleResult>
  </Example>
</template>

<script setup lang="ts">
  const length = ref(2)
  const type = ref('words')
</script>
