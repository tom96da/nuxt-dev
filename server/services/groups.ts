import type { Group } from '#shared/schema/group'

const groupsStore: Group[] = []

export const getGroup = (gid?: string): Group | undefined => {
  return groupsStore.find(group => group.gid === gid) || undefined
}
