using AutoMapper;
using BruteForce.DTOs;
using BruteForce.Models;

namespace BruteForce.Profiles
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<Game, GameDTO>();
            CreateMap<GameDTO, Game>();
        }
    }
}
