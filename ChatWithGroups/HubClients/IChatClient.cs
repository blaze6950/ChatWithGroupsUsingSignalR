using System.Threading.Tasks;
using ChatWithGroups.Models;

namespace ChatWithGroups.HubClients
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message message);
    }
}