<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        const i  = createElement('i',{
        attrs: {
          'icon-class': icon
        }
      })
      vnodes.push(i)
        // vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        const svg_icon  = createElement('svg-icon',{
        attrs: {
          'icon-class': icon
        }
      })
      vnodes.push(svg_icon)
        // vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {

      const span  = createElement('span',{
        attrs: {
           "slot":'title',
           "style":"font-size: 14px;"
        },
        title
      })
      vnodes.push(span)

      // vnodes.push(<span slot='title' style='font-size: 14px;'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 0.3em;
  height: 0.3em;
}
</style>
