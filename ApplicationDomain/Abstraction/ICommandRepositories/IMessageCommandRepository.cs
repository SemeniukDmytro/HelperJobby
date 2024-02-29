﻿using ApplicationDomain.MessagingRelatedModels;

namespace ApplicationDomain.Abstraction.ICommandRepositories;

public interface IMessageCommandRepository
{
    public Task<Message> CreateMessage(Message message);
}