module.exports = {
  title: 'IIJ Bootcamp',
  description: 'IIJ で実施している新人向けのハンズオン資料集です。',
  themeConfig: {
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    repo: 'iij/bootcamp',
    docsDir: 'src',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub'
  },
  markdown: {
    extendMarkdown: md => {
      md.set({
        linkify: true
      })
    }
  },
  base: '/bootcamp/',
  dest: 'docs',
  plugins: [
    '@vuepress/register-components',
    ['vuepress-plugin-code-copy', true]
  ]
}
