using System.Collections.Generic;
using System.Linq;
using BruteForce.Data;
using BruteForce.DTOs;
using BruteForce.Models;
using AutoMapper;

namespace BruteForce.Services
{
    public class GameService
    {
        private readonly GameContext _context;
        private readonly IMapper _mapper;

        public GameService(GameContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<GameDTO> GetAllGames()
        {
            var games = _context.Games.ToList();
            return _mapper.Map<IEnumerable<GameDTO>>(games);
        }

        public GameDTO GetGameById(int id)
        {
            var game = _context.Games.FirstOrDefault(g => g.Id == id);
            return _mapper.Map<GameDTO>(game);
        }

        public GameDTO CreateGame(GameDTO gameDTO)
        {
            var game = _mapper.Map<Game>(gameDTO);
            _context.Games.Add(game);
            _context.SaveChanges();
            return _mapper.Map<GameDTO>(game);
        }

        public GameDTO UpdateGame(int id, GameDTO gameDTO)
        {
            var existingGame = _context.Games.FirstOrDefault(g => g.Id == id);
            if (existingGame != null)
            {
                _mapper.Map(gameDTO, existingGame);
                _context.SaveChanges();
            }
            return _mapper.Map<GameDTO>(existingGame);
        }

        public bool DeleteGame(int id)
        {
            var game = _context.Games.FirstOrDefault(g => g.Id == id);
            if (game != null)
            {
                _context.Games.Remove(game);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
    }
}
