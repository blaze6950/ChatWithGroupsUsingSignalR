using System;
using System.Threading.Tasks;
using ChatWithGroups.HubClients;
using ChatWithGroups.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatWithGroups.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private const string DefaultChatName = nameof(DefaultChatName);
        public async Task SendMessage(Message message)
        {
            if (message.IsToChat)
            {
                await Clients.Group(message.ChatId.ToString()).ReceiveMessage(message);
            }
            else
            {
                await Clients.Group(DefaultChatName).ReceiveMessage(message);
            }
        }

        public async Task CreateChat()
        {
            var chat = new Chat(Guid.NewGuid());
            await AddToGroup(chat.Id.ToString());
            await Clients.Caller.CreateChat(chat);
        }

        public async Task JoinChat(Chat chat)
        {
            await AddToGroup(chat.Id.ToString());
        }

        private async Task AddToGroup(string name)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, name);
        }

        public override async Task OnConnectedAsync()
        {
            await AddToGroup(DefaultChatName);
            await base.OnConnectedAsync();
        }
    }
}