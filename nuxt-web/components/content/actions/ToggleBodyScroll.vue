<template>
  <Example>  
    <ExampleInputs>
      <FormInput v-model="classes" label="Classes" placeholder="Enter your classes" />
      <FormSelect v-model="action" label="Action" info="Default: toggle">
        <option value="toggle">Toggle</option>
        <option value="add">Add</option>
        <option value="remove">Remove</option>
      </FormSelect>
      <Button color="secondary" class="w-full" @click="toggleBodyScroll(classes, action)">Click</Button>
    </ExampleInputs>
    <ExampleCode :code="`toggleBodyScroll('${classes}', action: '${action}')`" />
  </Example>
  <Callout class="mt-6">
    <p>Use your own class names, or ensure fixed is within your Tailwindcss JIT</p>
  </Callout>
</template>

<script setup lang="ts">
const classes = ref<string>('fixed');
const action = ref<'toggle' | 'add' | 'remove'>('toggle');
</script>
