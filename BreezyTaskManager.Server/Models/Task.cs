using System.ComponentModel.DataAnnotations;

namespace BreezyTaskManager.Server.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }

        [Required(ErrorMessage = "Task name is required")]
        [StringLength(100, ErrorMessage = "Task name cannot exceed 100 characters")]
        public string? Name { get; set; }

        [StringLength(500, ErrorMessage = "Description cannot exceed 500 characters")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Due date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; }
    }
}
