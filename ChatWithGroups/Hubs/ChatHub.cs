using System.Threading.Tasks;
using ChatWithGroups.HubClients;
using ChatWithGroups.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatWithGroups.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}