import { ExtensionContext, workspace } from 'coc.nvim'
import Manager from './manager'

export async function activate(context: ExtensionContext): Promise<void> {
  let { subscriptions } = context
  let manager = new Manager(workspace.nvim)

  subscriptions.push(workspace.registerKeymap(['n'], 'smartf-forward', async () => {
    await manager.forward()
  }, { sync: false, cancel: true, silent: true }))

  subscriptions.push(workspace.registerKeymap(['n'], 'smartf-backward', async () => {
    await manager.backward()
  }, { sync: false, cancel: true, silent: true }))

  subscriptions.push(workspace.registerKeymap(['n'], 'smartf-repeat', async () => {
    await manager.repeat()
  }, { sync: false, cancel: true, silent: true }))

  subscriptions.push(workspace.registerKeymap(['n'], 'smartf-repeat-opposite', async () => {
    await manager.repeatOpposite()
  }, { sync: false, cancel: true, silent: true }))
}
