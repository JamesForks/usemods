<template>
  <Example>
    <ExampleInputs>
      <FormInput label="Text" type="text" v-model="value" />
    </ExampleInputs>
    <ExampleCode :code="`formatTextWrap(${value})`" />
    <ExampleResult>
      {{ formatTextWrap(value) }}
    </ExampleResult>
  </Example>
  <Callout class="mt-8">
    <Icon name="heroicons:information-circle-20-solid" class="text-indigo-400 mr-2" />
    Remember
    <code>text-wrap: pretty</code>
    or
    <code>text-wrap: balance</code>
    works in modern browsers (but Safari).
  </Callout>
</template>

<script setup lang="ts">
  const value = ref('Scooters are the future')
</script>
