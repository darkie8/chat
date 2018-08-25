import { ChatsModule } from './chats.module';

describe('ChatsModule', () => {
  let chatsModule: ChatsModule;

  beforeEach(() => {
    chatsModule = new ChatsModule();
  });

  it('should create an instance', () => {
    expect(chatsModule).toBeTruthy();
  });
});
