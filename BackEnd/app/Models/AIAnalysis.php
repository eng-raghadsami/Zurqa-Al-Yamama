<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIAnalysis extends Model
{
    use HasFactory;

    protected $fillable = ['content_id','tool_name','result'];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }
}

