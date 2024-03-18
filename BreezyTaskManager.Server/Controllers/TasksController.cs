using BreezyTaskManager.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Task = BreezyTaskManager.Server.Models.Task;

namespace BreezyTaskManager.Server.Controllers
{
    [Route("api/task")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllTask()
        {
            return Ok(_context.Tasks.ToList());
        }
        [HttpPost]
        public IActionResult AddTask(Task task)
        {
            try
            {
                _context.Tasks.Add(task);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, task);
            }
            catch (Exception)
            {      
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, Task newTask)
        {
            try
            {
                var existingTask = _context.Tasks.Find(id);

                if (existingTask == null)
                {
                    return NotFound();
                }

                existingTask.Name = newTask.Name;
                existingTask.Description = newTask.Description;
                existingTask.DueDate = newTask.DueDate;
                existingTask.IsCompleted = newTask.IsCompleted;

                _context.Tasks.Update(existingTask);
                _context.SaveChanges();

                return Ok(existingTask); 
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("{id}/completion")]
        public IActionResult UpdateCompletion(int id, [FromBody] bool isCompleted)
        {
            try
            {
                var task = _context.Tasks.Find(id);
                if (task == null)
                {
                    return NotFound();
                }

                task.IsCompleted = isCompleted;
                _context.SaveChanges();

                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                var task = _context.Tasks.Find(id);
                if (task == null)
                {
                    return NotFound(); 
                }

                _context.Tasks.Remove(task);
                _context.SaveChanges();

                return Ok(); 
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError); 
            }
        }
    }
}
