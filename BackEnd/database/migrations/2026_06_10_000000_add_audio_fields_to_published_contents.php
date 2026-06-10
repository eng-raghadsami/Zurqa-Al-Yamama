<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('published_contents', function (Blueprint $table) {
            $table->string('audio_path')->nullable();
            $table->string('audio_model_id')->nullable();
            $table->string('audio_voice_id')->nullable();
            $table->timestamp('audio_generated_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('published_contents', function (Blueprint $table) {
            $table->dropColumn(['audio_path', 'audio_model_id', 'audio_voice_id', 'audio_generated_at']);
        });
    }
};

