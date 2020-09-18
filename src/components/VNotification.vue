<template>
  <vs-alert :hidden-content.sync="hidden" color="#fff">
    <template #title>
      Como Adicionar Tags De Maneira Eficiente?
    </template>
    Para ajudar nosso sistema a filtrar suas tags corretamente, recomendamos que
    adicione tags conforme o exemplo a seguir: Exemplo: #tag1, #tag2, #tag3...
    Note que a marcação das tags começam com
    <strong> # + nome da tag + vírgula(Se tiver mais de uma Tag)</strong>.
  </vs-alert>
</template>
<script>
export default {
  data: () => ({
    hidden: true
  })
}
</script>
