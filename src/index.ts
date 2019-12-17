import { ExtensionContext, workspace } from 'coc.nvim';
import Manager from './manager.ts';

export async function activate(context: ExtensionContext): Promise<void> {
    const { subscriptions } = context;
    const manager = new Manager(workspace.nvim);

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-tforward',
            async () => {
                await manager.tforward();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-tbackward',
            async () => {
                await manager.tbackward();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-fforward',
            async () => {
                await manager.fforward();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-fbackward',
            async () => {
                await manager.fbackward();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-repeat',
            async () => {
                await manager.repeat();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );

    subscriptions.push(
        workspace.registerKeymap(
            ['n'],
            'smartf-repeat-opposite',
            async () => {
                await manager.repeatOpposite();
            },
            { sync: false, cancel: true, silent: true },
        ),
    );
}

export default {
    activate,
};
