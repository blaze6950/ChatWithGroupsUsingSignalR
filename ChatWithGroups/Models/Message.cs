using System;

namespace ChatWithGroups.Models
{
    public record Message(string User, string Content, Guid? ChatId)
    {
        public bool IsToChat => ChatId.HasValue;
    };
}