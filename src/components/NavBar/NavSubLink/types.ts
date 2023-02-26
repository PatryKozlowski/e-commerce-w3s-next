export interface Props {
  menu: {
    linkName: string
    href: string
    subMenu: Array<{
      linkName: string
      href: string
    }>
  }
}
