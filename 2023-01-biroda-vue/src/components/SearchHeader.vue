<script setup></script>
<template>
  <a-form layout="inline">
    <a-form-item label="Movie title">
      <a-input
        placeholder="{randomMovieName}"
        disabled="{props.searchDisabled}"
        value="{searchValue}"
        onChange="{(el) => setSearchValue(el.target.value)}"
        onPressEnter="{handleSubmit}"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" onClick="{handleSubmit}" disabled="{isSubmitDisabled}">
        Search
      </a-button>
    </a-form-item>
  </a-form>
</template>
